
"use client"; 

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firestore";
import { useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteClientById } from "@/app/lib/firestore-data";

export default function AddClientButton() {
  const [isAdding, setIsAdding] = useState(false);

  async function addClient() {
    setIsAdding(true);
    try {
      const docRef = await addDoc(collection(db, "clients"),{
        name: 'Gene Wilson',
        email: 'willygene@mailer.com',
        image_url: '/customers/gene-wilson.png',
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error adding document: ", error);
      console.error("Error adding document: ", error);
    } finally {
      setIsAdding(false);
    }
  }

  

  return (
    <>
    <button 
    onClick={addClient} 
    disabled={isAdding}
    className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
      {isAdding ? "Adding..." : "Add Client"}
    </button>
    </>
  );
}

export function CreateClient() {
    return (
      <Link
        href="/dashboard/clients/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Add Client</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  }

  export function UpdateClient({ id }: { id: string }) {
    return (
      <Link
        href={`/dashboard/clients/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    );
  }
  
  export function DeleteClient({ id }: { id: string }) {
    
    async function deleteClientWithId() {
        try {
          await deleteClientById(id);
          
          console.log(`Client with ID ${id} has been deleted.`);
        } catch (error) {
          console.error(`Failed to delete client with ID ${id}:`, error);
        }
    }
      
    return (
      <form action={deleteClientWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    );
  }