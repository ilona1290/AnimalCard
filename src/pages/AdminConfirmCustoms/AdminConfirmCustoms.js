import React, { useEffect, useState } from "react";
import { getData, postData } from "../../components/Services/AccessAPI";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import "./AdminConfirmCustoms.css";
import { styled } from '@mui/material/styles';

import CorrectIcon from "./correct.svg";
import RejectIcon from './remove.svg';
import Loader from "../../components/Loader";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

  const StyledTreeItem = styled(TreeItem)(() => ({
    [`& .${treeItemClasses.content}`]: {
        border: "1px black solid",
        margin: "0.3em",
        padding: "0.5em",
        borderRadius: "20px",
        boxShadow: "0.25em 0.25em  0.25em  rgba( 0, 0, 0, 0.3 )",
        display: "flex",
        alignItems: "center"
    },
    [`& .${treeItemClasses.label}`]: {
        fontSize: "3rem !important",
        padding: "0.1em 0em 0em 0em !important",
        fontFamily: "'Montserrat', sans-serif !important"
    }
  }));
  let expandedAll = false;
  

function AdminConfirmCustoms(){
    let navigate = useNavigate();
    let nodeCounter = 1;
    const [isLoading, setLoading] = useState(true);
    const [customs, setCustoms] = useState([]);
    const [confirmedDiseases, setConfirmedDiseases] = useState([]);
    const [rejectedDiseases, setRejectedDiseases] = useState([]);
    const [confirmedServicesTreatments, setConfirmedServicesTreatments] = useState([]);
    const [rejectedServicesTreatments, setRejectedServicesTreatments] = useState([]);
    const [expanded, setExpanded] = useState([]);
    let opened = []
    useEffect(() => {
        getData('api/Admin/GetDiseasesAndServicesTreatmentsToConfirm').then((result) => {
            setCustoms(result.customsToConfirm);
            setLoading(false);
        })
    }, [])

    const setOpened = () => {
        nodeCounter = 1
        for (let i = 0; i < customs.length; i++) {
            if(customs[i].diseasesToConfirm.length !== 0 || customs[i].servicesTreatmentsToConfirm.length !== 0){
                opened.push(nodeCounter++)
                if(customs[i].diseasesToConfirm.length !== 0){
                    opened.push(nodeCounter++)
                    nodeCounter += customs[i].diseasesToConfirm.length
                }
                else{
                    nodeCounter++
                }
                
                if(customs[i].servicesTreatmentsToConfirm.length !== 0){
                    opened.push(nodeCounter++)
                    nodeCounter += customs[i].servicesTreatmentsToConfirm.length
                }
                else{
                    nodeCounter++
                }
            }
            else{
                nodeCounter += 3
            }
        }
        nodeCounter = 1
    }

    const handleToggle = (event, nodeIds) => {
        expandedAll = false;
        setExpanded(nodeIds);
    };

    const handleExpandClick = () => {
        expandedAll = true;
        setOpened();
        setExpanded((oldExpanded) =>
          oldExpanded.length === 0 ? opened : [],
        );
    };

    const handleExpandInSequence = (vetIndex, type, index) => {
        let nodeId = 0;
        for(let i = 0; i <= vetIndex; i++){
            if(i !== vetIndex){
                nodeId += 2 + customs[i].diseasesToConfirm.length + 1 + customs[i].servicesTreatmentsToConfirm.length
            }
            else if(type === "disease"){

                nodeId += 3 + index
            }
            else{
                nodeId += 3 + customs[i].diseasesToConfirm.length + index
            }
        }
        return(nodeId)
    }

    const confirmDisease = (vetIndex, diseaseId, disIndex) => {
        setConfirmedDiseases([...confirmedDiseases, diseaseId])
        customs[vetIndex].diseasesToConfirm.splice(disIndex, 1);
        if(expandedAll === true){
            setExpanded([])
            handleExpandClick()
        }
        else{
            let nodeId = handleExpandInSequence(vetIndex,"disease", disIndex);
            let copyExpanded = [...expanded]
            for(let i = 0; i < expanded.length; i++){
                if(expanded[i] > nodeId){
                    copyExpanded[i]--
                }
            }
            setExpanded(copyExpanded)
        }
    }

    const rejectDisease = (vetIndex, diseaseId, disIndex) => {
        setRejectedDiseases([...rejectedDiseases, diseaseId]);
        customs[vetIndex].diseasesToConfirm.splice(disIndex, 1);
        if(expandedAll === true){
            setExpanded([])
            handleExpandClick()
        }
        else{
            let nodeId = handleExpandInSequence(vetIndex, "disease", disIndex);
            let copyExpanded = [...expanded]
            for(let i = 0; i < expanded.length; i++){
                if(expanded[i] > nodeId){
                    copyExpanded[i]--
                }
            }
            setExpanded(copyExpanded)
        }
    }

    const confirmServiceTreatment = (vetIndex, serviceTreatmentId, servIndex) => {
        setConfirmedServicesTreatments([...confirmedServicesTreatments, serviceTreatmentId])
        customs[vetIndex].servicesTreatmentsToConfirm.splice(servIndex, 1);
        if(expandedAll === true){
            setExpanded([])
            handleExpandClick()
        }
        else{
            let nodeId = handleExpandInSequence(vetIndex,"serviceTreatment", servIndex);
            let copyExpanded = [...expanded]
            for(let i = 0; i < expanded.length; i++){
                if(expanded[i] > nodeId){
                    copyExpanded[i]--
                }
            }
            setExpanded(copyExpanded)
        }
    }

    const rejectServiceTreatment = (vetIndex, serviceTreatmentId, servIndex) => {
        setRejectedServicesTreatments([...rejectedServicesTreatments, serviceTreatmentId])
        customs[vetIndex].servicesTreatmentsToConfirm.splice(servIndex, 1);
        if(expandedAll === true){
            setExpanded([])
            handleExpandClick()
        }
        else{
            let nodeId = handleExpandInSequence(vetIndex,"serviceTreatment", servIndex);
            let copyExpanded = [...expanded]
            for(let i = 0; i < expanded.length; i++){
                if(expanded[i] > nodeId){
                    copyExpanded[i]--
                }
            }
            setExpanded(copyExpanded)
        }
    }

    const send = (e) => {
        e.target.innerText = ""
        e.preventDefault();
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    
    e.target.classList.add('animate');
    
    setTimeout(function(){
        navigate("/adminMenu")
      
      },3200);
    setTimeout(function(){
      e.target.classList.remove('animate');
    
    },4000);
        // const dataToSend = {
        //     confirmedDiseases: confirmedDiseases,
        //     rejectedDiseases: rejectedDiseases,
        //     confirmedServicesTreatments: confirmedServicesTreatments,
        //     rejectedServicesTreatments: rejectedServicesTreatments,
        // }
        // postData('api/Admin/ConfirmOrRejectCustoms', dataToSend).then((result) => {
        //     if(result === true){
        //         navigate("/adminMenu");
        //     }
        // });
    }

    return(
        <div style={{paddingTop: "9%"}}>
            {isLoading && <Loader />}
            <ThemeProvider theme={theme}>
                <Typography component={'span'} variant={'body2'}>
                    {!isLoading &&
                    <Box sx={{ mb: 1 }}>
                        <button className="open__close__btn"
                          onClick={handleExpandClick}>
                        {expanded.length === 0 ? 'Otwórz wszystkie' : 'Zamknij wszystkie'}
                        </button>
                    </Box>}
                    <div style={{width: "100%"}}>
                    <TreeView
                        aria-label="controlled"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        expanded={expanded}
                        onNodeToggle={handleToggle}
                        sx={{display:"flex", justifyContent: "center", flexDirection:"column", textAlign:"left", overflowY: "hidden",
                        paddingLeft: "20%", paddingRight: "20%"}}
                    >
                        {customs.map((elem, index) => (

                        <div>
                        <StyledTreeItem  nodeId={nodeCounter++} label={elem.vetName + " " + elem.vetSurname}>
                            <StyledTreeItem nodeId={nodeCounter++} label="Choroby">
                                {elem.diseasesToConfirm.map((dis, disIndex) => (
                                <StyledTreeItem nodeId={nodeCounter++} label={
                                    <div>
                                        <div style={{display: "inline"}}>{dis.diseaseName}</div>
                                        <button onClick={() => rejectDisease(index, dis.diseaseId, disIndex)} style={{float:"right", marginRight: "0.5em", backgroundColor: "transparent", fontSize: "2.5rem", padding:"0em 0.1em", color: "white", 
                                        border: "none", borderRadius: 20, cursor: "pointer"}}><img src={RejectIcon} alt="RejectIcon"></img></button>
                                        <button onClick={() => confirmDisease(index, dis.diseaseId, disIndex)} 
                                        style={{float:"right", backgroundColor: "transparent", marginRight: "0.3em", fontSize: "2.5rem", padding:"0em 0.1em", color: "white", 
                                        border: "none", borderRadius: 20, cursor: "pointer"}}><img src={CorrectIcon} alt="CorrectIcon"></img></button>
                                    </div> }/>
                                ))}
                            </StyledTreeItem>
                            <StyledTreeItem nodeId={nodeCounter++} label="Usługi i zabiegi">
                                {elem.servicesTreatmentsToConfirm.map((serv, servIndex) => (
                                <StyledTreeItem nodeId={nodeCounter++} label={
                                    <div>
                                        <div style={{display: "inline"}}>{serv.serviceTreatmentName}</div>
                                        <button onClick={() =>  rejectServiceTreatment(index, serv.serviceTreatmentId, servIndex)} style={{float:"right", marginRight: "0.5em", backgroundColor: "transparent", fontSize: "2.5rem", padding:"0em 0.1em", color: "white", 
                                        border: "none", borderRadius: 20, cursor: "pointer"}}><img src={RejectIcon} alt="RejectIcon"></img></button>
                                        <button onClick={() => confirmServiceTreatment(index, serv.serviceTreatmentId, servIndex)}
                                        style={{float:"right", backgroundColor: "transparent", marginRight: "0.3em", fontSize: "2.5rem", padding:"0em 0.1em", color: "white", 
                                        border: "none", borderRadius: 20, cursor: "pointer"}}><img src={CorrectIcon} alt="CorrectIcon"></img></button>
                                    </div> }/>
                                ))}
                            </StyledTreeItem>
                        </StyledTreeItem>
                        </div>
                        
                        ))}
                    </TreeView>
                    </div>
            </Typography>
            </ThemeProvider>
            {!isLoading && 
            <button className="header__buttons__end__btn confirm__btn success" style={{position: "absolute", top: "3.5em", right: "15em"}} onClick={send}>Zapisz</button>}
            <Link to="/adminMenu">
                <button className="header__buttons__end__btn" style={{position: "absolute", top: "3.5em", right: "6em"}}>Powrót</button>
            </Link>
        </div>
    );
}

export default AdminConfirmCustoms;