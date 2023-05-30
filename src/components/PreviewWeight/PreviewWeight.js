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
      fontSize: 16,
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

function PreviewWeight({ weights }){
    return(
        <div className="visit__element visit__element__table">Waga
            <div style={{display: "flex", justifyContent: "center", paddingTop: "2em"}}>
                <ThemeProvider theme={theme}>
                    <Typography component={'span'} variant={'body2'}>
                        <Table  aria-label="customized table" sx={{minWidth: "500px"}}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{borderRadius: "25px 25px 0 0 "}} align="center">Waga[kg]</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {weights.map((row) => (
                                    <StyledTableRow key={row.weightValue}>
                                        <StyledTableCell component="th" scope="row" align="center">{row.weightValue}</StyledTableCell>
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

export default PreviewWeight;