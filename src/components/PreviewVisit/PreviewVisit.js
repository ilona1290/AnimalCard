import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import "./PreviewVisit.css";

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

function PreviewVisit({ handleShowPreview, rabiesVaccinations }){
    let navigate = useNavigate();
    const animateButton = (e) => {
        e.target.innerText = ""
        e.preventDefault();
        //reset animation
        e.target.classList.remove('animate');
        
        e.target.classList.add('animate');
        
        e.target.classList.add('animate');
        setTimeout(function(){
            navigate("/vetMenu/calendar")
          }, 3200);
        setTimeout(function(){
          e.target.classList.remove('animate');
        },4000);
        
      };
    return(
        <div>
            
            <button className="header__buttons__end__btn" id="backPreview" style={{position: "absolute", right: "2em", top: "3.5em"}} onClick={handleShowPreview}>
                <p>Chcę jeszcze coś zmienić</p>
            </button>
            
            <div className="visit__element visit__element__table">Szczepienia przeciwko wściekliźnie
            {/* <TableContainer component={Paper}> */}
            <div style={{display: "flex", justifyContent: "center", paddingTop: "2em"}}>

            <ThemeProvider theme={theme}>
                            <Typography component={'span'} variant={'body2'}>
      <Table  aria-label="customized table" sx={{minWidth: "500px"}}>
        <TableHead>
          <TableRow>
            <StyledTableCell style={{borderRadius: "25px 0 0 0 "}} align="center">Nazwa szczepionki</StyledTableCell>
            <StyledTableCell align="center">Nr serii</StyledTableCell>
            <StyledTableCell align="center">Data ważności szczepionki</StyledTableCell>
            <StyledTableCell style={{borderRadius: "0 25px 0 0 "}} align="center">Termin następnego szczepienia</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rabiesVaccinations.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.series}</StyledTableCell>
              <StyledTableCell align="center">{row.date1}</StyledTableCell>
              <StyledTableCell align="center">{row.date2}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </Typography>
      </ThemeProvider>
      </div></div>
    {/* </TableContainer> */}
            <div className="visit__element">Szczepienia przeciwko innym chorobom zakaźnym</div>
            <div className="visit__element">Choroby</div>
            <div className="visit__element">Zabiegi</div>
            <div className="visit__element">Badania</div>
            <div className="visit__element">Waga</div>
            <button className="header__buttons__end__btn save__btn" onClick={animateButton}>
                Zapisz
            </button>
        </div>
    )
}

export default PreviewVisit;