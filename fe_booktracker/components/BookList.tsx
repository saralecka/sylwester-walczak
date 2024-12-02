import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "@/utils/axiosInstance";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchSchema = z.object({
  searchQuery: z.string(),
});

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  num_pages: number;
  rating: number;
}
interface Pagination {
  next: string | null;
  previous: string | null;
}

interface BookListProps {
  refetch: boolean;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface FormData {
  searchQuery: string;
}

export function BookList({ refetch }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    next: null,
    previous: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBooks = async (query: string = "", url: string = "/books/") => {
    setIsLoading(true);
    try {
      const params = query ? { search: query } : {};
      const response = await axiosInstance.get<PaginatedResponse<Book>>(url, {
        params,
      });
      setBooks(response.data.results);
      setPagination({
        next: response.data.next,
        previous: response.data.previous,
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: { searchQuery: string }) => {
    setSearchQuery(data.searchQuery);
  };

  useEffect(() => {
    fetchBooks(searchQuery);
  }, [searchQuery, refetch]);

  const handleClearFilter = () => {
    reset();
    setSearchQuery("");
    fetchBooks();
  };

  const handlePagination = (url: string | null) => {
    if (url) {
      fetchBooks(searchQuery, url);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista książek</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 mb-4"
      >
        <Input
          type="text"
          placeholder="Wyszukaj książki..."
          {...register("searchQuery")}
        />
        {errors.searchQuery && (
          <div className="text-red-500">{errors.searchQuery.message}</div>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Ładowanie..." : "Szukaj"}
        </Button>

        <Button onClick={handleClearFilter} disabled={isLoading}>
          Wyczyść filtr
        </Button>
      </form>

      {isLoading ? (
        <p>Ładowanie książek...</p>
      ) : (
        <>
          <Table>
            <TableCaption>Lista książek</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Tytuł</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Liczba stron</TableHead>
                <TableHead>Ocena</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.num_pages}</TableCell>
                  <TableCell>{book.rating}/5</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between mt-4">
            <Button
              onClick={() => handlePagination(pagination.previous)}
              disabled={!pagination.previous || isLoading}
            >
              Poprzednia
            </Button>
            <Button
              onClick={() => handlePagination(pagination.next)}
              disabled={!pagination.next || isLoading}
            >
              Następna
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
