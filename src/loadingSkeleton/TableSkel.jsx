import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
const TableSkel = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-zinc-800">
          <TableHead className="w-[50px]">
            <div className="h-4 bg-zinc-700 rounded animate-pulse w-8 mx-auto" />
          </TableHead>
          <TableHead>
            <div className="h-4 bg-zinc-700 rounded animate-pulse w-24" />
          </TableHead>
          <TableHead>
            <div className="h-4 bg-zinc-700 rounded animate-pulse w-24" />
          </TableHead>
          <TableHead>
            <div className="h-4 bg-zinc-700 rounded animate-pulse w-24" />
          </TableHead>
          <TableHead className="text-right">
            <div className="h-4 bg-zinc-700 rounded animate-pulse w-16 mx-auto" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 7 }).map((_, i) => (
          <TableRow key={i} className="bg-zinc-800/50">
            <TableCell>
              <div className="w-10 h-10 bg-zinc-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-zinc-700 rounded animate-pulse w-3/4" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-zinc-700 rounded animate-pulse w-1/2" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-zinc-700 rounded animate-pulse w-2/3" />
            </TableCell>
            <TableCell className="text-right">
              <div className="h-4 bg-zinc-700 rounded animate-pulse w-12 mx-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkel;
