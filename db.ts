import { firestore } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
} from "firebase/firestore";

// Collection references
const bookingsCollection = collection(firestore, "bookings");
const servicesCollection = collection(firestore, "services");

// Helper function to convert Firestore document to our data model
const convertBooking = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data();
  return {
    id: doc.id,
    customerEmail: data.customerEmail,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    vehicleMake: data.vehicleMake,
    vehicleModel: data.vehicleModel,
    vehicleYear: data.vehicleYear,
    vehicleVin: data.vehicleVin,
    serviceId: data.serviceId,
    appointmentDate: data.appointmentDate?.toDate(),
    status: data.status,
    message: data.message,
    totalAmount: data.totalAmount,
    isPaid: data.isPaid,
    createdAt: data.createdAt?.toDate(),
  };
};

const convertService = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    description: data.description,
    estimatedPrice: data.estimatedPrice,
    createdAt: data.createdAt?.toDate(),
  };
};

// Database interface
export const dbInterface = {
  bookings: {
    findMany: async () => {
      try {
        const snapshot = await getDocs(bookingsCollection);
        return snapshot.docs.map(convertBooking);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        return [];
      }
    },
    findFirst: async (params: { where: any }) => {
      try {
        // Extract the first condition (we'll simplify for this example)
        const condition = Object.entries(params.where)[0];
        const fieldPath = condition[0];
        const value = condition[1];

        const q = query(bookingsCollection, where(fieldPath, "==", value));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          return null;
        }

        return convertBooking(snapshot.docs[0]);
      } catch (error) {
        console.error("Error finding booking:", error);
        return null;
      }
    },
    create: async (data: any) => {
      try {
        const docRef = await addDoc(bookingsCollection, {
          ...data,
          createdAt: serverTimestamp(),
        });

        const newDoc = await getDoc(docRef);
        return convertBooking(newDoc as QueryDocumentSnapshot<DocumentData>);
      } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
      }
    },
    update: async (id: string, data: any) => {
      try {
        const docRef = doc(firestore, "bookings", id);
        await updateDoc(docRef, data);

        const updatedDoc = await getDoc(docRef);
        return convertBooking(
          updatedDoc as QueryDocumentSnapshot<DocumentData>
        );
      } catch (error) {
        console.error("Error updating booking:", error);
        throw error;
      }
    },
  },
  services: {
    findMany: async () => {
      try {
        const snapshot = await getDocs(servicesCollection);
        return snapshot.docs.map(convertService);
      } catch (error) {
        console.error("Error fetching services:", error);
        return [];
      }
    },
    findFirst: async (params: { where: any }) => {
      try {
        // Extract the first condition (we'll simplify for this example)
        const condition = Object.entries(params.where)[0];
        const fieldPath = condition[0];
        const value = condition[1];

        const q = query(servicesCollection, where(fieldPath, "==", value));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          return null;
        }

        return convertService(snapshot.docs[0]);
      } catch (error) {
        console.error("Error finding service:", error);
        return null;
      }
    },
  },
};

// For compatibility with existing code
export const db = {
  query: {
    bookings: {
      findMany: dbInterface.bookings.findMany,
      findFirst: dbInterface.bookings.findFirst,
    },
    services: {
      findMany: dbInterface.services.findMany,
      findFirst: dbInterface.services.findFirst,
    },
  },
  insert: (table: any) => {
    return {
      values: (data: any) => {
        return {
          returning: async () => {
            if (table === "bookings") {
              const result = await dbInterface.bookings.create(data);
              return [result];
            }
            return [];
          },
        };
      },
    };
  },
  update: (table: any) => {
    return {
      set: (data: any) => {
        return {
          where: (condition: any) => {
            return {
              returning: async () => {
                if (table === "bookings") {
                  // Extract ID from condition (simplified)
                  const id = String(Object.values(condition)[0]);
                  const result = await dbInterface.bookings.update(id, data);
                  return [result];
                }
                return [];
              },
            };
          },
        };
      },
    };
  },
};
