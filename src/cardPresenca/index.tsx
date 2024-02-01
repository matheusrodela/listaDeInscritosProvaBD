import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface ExamLocation {
  localDaProva: string;
}

interface ExamHour {
  horario?: string;
  localDaProva?: ExamLocation;
}

interface ExamDate {
  data: string;
}

interface Candidate {
  nomeCompleto: string;
  examHour?: ExamHour;
  examDate?: ExamDate;
}

interface CandidatesGroupedByHour {
  [hour: string]: string[];
}

interface CardPresecaProps {
  examLocation: string;
}

const CardPresenca = ({ examLocation }: CardPresecaProps) => {
  const [candidatesByHour, setCandidatesByHour] =
    useState<CandidatesGroupedByHour>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Api-Key": import.meta.env.VITE_API_KEY,
        },
      };
      const response = await axios.get<Candidate[]>(
        "https://api-hml.pdcloud.dev/form",
        config
      );
      const today = new Date().toISOString().split("T")[0];

      const filteredCandidates = response.data.filter(
        (candidate) =>
          candidate.examHour?.localDaProva?.localDaProva === examLocation &&
          candidate.examDate?.data === today
      );

      const candidatesGroupedByHour =
        filteredCandidates.reduce<CandidatesGroupedByHour>((acc, candidate) => {
          const hour = candidate.examHour?.horario;
          if (hour) {
            if (!acc[hour]) {
              acc[hour] = [];
            }
            acc[hour].push(candidate.nomeCompleto);
          }
          return acc;
        }, {});

      Object.keys(candidatesGroupedByHour).forEach((hour) => {
        candidatesGroupedByHour[hour].sort((a, b) => a.localeCompare(b));
      });

      setCandidatesByHour(candidatesGroupedByHour);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [examLocation]);

  const formatHour = (hourString: string) => {
    return hourString.split(":").slice(0, 2).join(":");
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "45vh" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      sx={{
        minHeight: "45vh",
        px: 1,
        py: 3,
      }}
    >
      {Object.entries(candidatesByHour)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([hour, candidates], index) => (
          <TableContainer key={index} sx={{ my: 1 }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              {formatHour(hour)}
            </Typography>
            <Table>
              <TableBody>
                {candidates.map((name, candidateIndex) => (
                  <TableRow key={candidateIndex}>
                    <TableCell>{name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}
    </Box>
  );
};

export default CardPresenca;
