"use client";

import React, { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosInstance from "@/utils/axiosInstance";
import { BOOK_ENDPOINTS } from "@/utils/endpoints";

const bookSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany"),
  author: z.string().min(1, "Autor jest wymagany"),
  isbn: z
    .string()
    .length(13, "ISBN musi mieć dokładnie 13 znaków")
    .regex(/^\d+$/, "ISBN musi składać się tylko z cyfr")
    .transform((val) => Number(val)),
  num_pages: z.number().min(1, "Liczba stron musi być większa niż 0"),
  rating: z
    .number()
    .min(1, "Ocena musi być między 1 a 5")
    .max(5, "Ocena musi być między 1 a 5"),
});

type BookFormValues = z.infer<typeof bookSchema>;
interface BookFormErrorResponse {
  isbn?: string[];
  title?: string[];
  author?: string[];
}
interface AddBookModalProps {
  onBookAdded: () => void;
}

export function AddBookModal({ onBookAdded }: AddBookModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
  });
  const onSubmit = async (data: BookFormValues) => {
    setIsSubmitting(true);
    try {
      await axiosInstance.post(BOOK_ENDPOINTS.CREATE, data);
      reset();
      setIsOpen(false);
      onBookAdded();
      toast({
        title: "Sukces!",
        description: "Książka została pomyślnie dodana.",
      });
    } catch (error: unknown) {
      console.error("Error creating book:", error);

      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data as BookFormErrorResponse;

        if (responseData?.isbn) {
          setError("isbn", {
            type: "manual",
            message: responseData.isbn[0],
          });
          toast({
            title: "Błąd ISBN",
            description: responseData.isbn[0],
            variant: "destructive",
          });
        }

        if (responseData?.title) {
          toast({
            title: "Błąd tytułu",
            description: responseData.title[0],
            variant: "destructive",
          });
        }

        if (responseData?.author) {
          toast({
            title: "Błąd autora",
            description: responseData.author[0],
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Wystąpił nieoczekiwany błąd",
          description: "Spróbuj ponownie później.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Dodaj książkę</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodaj nową książkę</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Input
                  {...register("title")}
                  placeholder="Tytuł"
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...register("author")}
                  placeholder="Autor"
                  disabled={isSubmitting}
                />
                {errors.author && (
                  <p className="text-red-500 text-sm">
                    {errors.author.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("isbn")}
                  placeholder="ISBN"
                  disabled={isSubmitting}
                  type="number"
                />
                {errors.isbn && (
                  <p className="text-red-500 text-sm">{errors.isbn.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...register("num_pages", { valueAsNumber: true })}
                  placeholder="Liczba stron"
                  type="number"
                  disabled={isSubmitting}
                />
                {errors.num_pages && (
                  <p className="text-red-500 text-sm">
                    {errors.num_pages.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("rating", { valueAsNumber: true })}
                  placeholder="Ocena (1-5)"
                  type="number"
                  step="0.1"
                  disabled={isSubmitting}
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm">
                    {errors.rating.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Dodawanie..." : "Dodaj"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Anuluj
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
