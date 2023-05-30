import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#4158d0",
      color: theme.palette.common.white,
      fontSize: 18,
      fontFamily: "Montserrat",
      fontWeight: "bold",
      width: "14vw"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      width: "14vw"
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function PreviewDiseases({ diseases }){
    return(
        <div className="visit__element" style={{padding: "1em 1em", margin: "1em 1em"}}>Choroby
            <div style={{display: "flex", justifyContent: "center", paddingTop: "2em"}}>
                <ThemeProvider theme={theme}>
                    <Typography component={'span'} variant={'body2'}>
                        <Table  aria-label="customized table" sx={{minWidth: "85vw"}}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{borderRadius: "25px 0 0 0 "}} align="center">Nazwa choroby</StyledTableCell>
                                    <StyledTableCell align="center">Opis choroby</StyledTableCell>
                                    <StyledTableCell align="center">Opis leczenia</StyledTableCell>
                                    <StyledTableCell align="center">Przepisane leki</StyledTableCell>
                                    <StyledTableCell style={{borderRadius: "0 25px 0 0 "}} align="center">Zalecenia</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {diseases.map((row) => (
                                    <StyledTableRow key={row.diseaseName}>
                                        <StyledTableCell component="th" scope="row" align="center">{row.diseaseName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.diseaseDescription}</StyledTableCell>
                                        <StyledTableCell align="center">{row.treatmentDescription}</StyledTableCell>
                                        <StyledTableCell align="center">{row.prescribedMedications}</StyledTableCell>
                                        <StyledTableCell align="center">{row.recommendations}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Typography>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default PreviewDiseases;