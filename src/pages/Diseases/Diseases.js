import React, { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getData } from "../../components/Services/AccessAPI";
import Loader from "../../components/Loader";

// const rows = [
//     {
//         id: 1, 
//         DiseaseDate: new Date("2023-05-02"),
//         DiseaseDescription: "Choroba Addisona u psa jest wynikiem niedoczynności kory nadnerczy, co prowadzi do niedoboru hormonów kortyzolu i aldosteronu. Objawy choroby mogą obejmować apatię, utratę apetytu, wymioty, biegunkę, osłabienie mięśni, letarg, zmiany skórne, zmiany w zachowaniu, a nawet śpiączkę.", 
//         TreatmentDescription: "Leczenie choroby Addisona u psa polega na suplementacji hormonów kortyzolu i aldosteronu, aby zrekompensować ich brak w organizmie psa. Leczenie może obejmować podawanie doustnych leków kortykosteroidowych, takich jak prednizon, lub w zaawansowanych przypadkach wstrzyknięcie kortyzolu i aldosteronu. W przypadkach nagłych wstrząsów, konieczne może być leczenie szpitalne.",  
//         PrescribedMedications: "Kortykosteroidy, takie jak prednizon, hydrokortyzon i deksametazon, a także leki zastępujące aldosteron, takie jak fludrokortyzon.",
//         Recommendations: "Ważne jest, aby psa z chorobą Addisona regularnie monitorować pod kątem poziomu hormonów i dostosowywać dawkę leków w razie potrzeby. W przypadku choroby Addisona, ważne jest również, aby ograniczyć stres psa, ponieważ stres może wpłynąć na poziom hormonów kortyzolu. Konieczne jest również zapewnienie odpowiedniej diety, która zapewni psu odpowiednią ilość elektrolitów, zwłaszcza sodu i potasu.",
//         Vet: "Marcin Klimczak"
//     },
//     {
//         id: 2, 
//         DiseaseDate: new Date("2018-09-05"),
//         DiseaseDescription: "Choroba zwyrodnieniowa stawów u psa jest wynikiem degeneracji chrząstki stawowej, która prowadzi do bólu i sztywności stawów. Może dotyczyć różnych stawów, ale najczęściej występuje w stawach biodrowych, kolanowych i łokciowych. Choroba ta jest zazwyczaj związana z wiekiem psa, ale może też wynikać z innych czynników, takich jak urazy lub otyłość.", 
//         TreatmentDescription: "Leczenie choroby zwyrodnieniowej stawów u psa ma na celu złagodzenie bólu i poprawę funkcji stawów. Leczenie może obejmować stosowanie leków przeciwbólowych, leków przeciwzapalnych, suplementów diety, fizjoterapii, akupunktury lub terapii laserowej. W przypadkach zaawansowanych, w których leczenie zachowawcze nie przynosi rezultatów, może być konieczna interwencja chirurgiczna.",  
//         PrescribedMedications: "Leki przeciwbólowe, takie jak karprofen, meloksykam lub tramadol, a także leki przeciwzapalne, takie jak kwas acetylosalicylowy lub diklofenak. Suplementy diety, takie jak glukozamina, chondroityna lub omega-3, mogą być również stosowane w celu poprawy zdrowia stawów psa.",
//         Recommendations: "W przypadku choroby zwyrodnieniowej stawów u psa ważne jest, aby dbać o wagę zwierzęcia i zapewnić mu aktywność fizyczną dostosowaną do jego stanu zdrowia. Ważne jest również, aby zapewnić psu odpowiednią dietę, która zapewni mu odpowiednie składniki odżywcze potrzebne do utrzymania zdrowych stawów. Konieczne jest również regularne badanie psa przez weterynarza, aby wczesniej zdiagnozować i leczyć chorobę zwyrodnieniową stawów u psa.",
//         Vet: "Marcin Klimczak"
//     },
//     {
//         id: 3, 
//         DiseaseDate: new Date("2015-03-25"),
//         DiseaseDescription: "Zapalenie pęcherza moczowego to stan zapalny, który wpływa na pęcherz moczowy psa. Choroba ta jest spowodowana przez bakterie, które dostają się do układu moczowego psa i rozmnażają się w pęcherzu moczowym. Częste objawy to częste oddawanie moczu, ból podczas oddawania moczu, krew w moczu oraz zmiana w zachowaniu psa (np. drażliwość, niewłaściwe zachowanie w miejscu oddawania moczu).", 
//         TreatmentDescription: "Leczenie zapalenia pęcherza moczowego u psa zależy od stopnia zaawansowania choroby. Jeśli choroba jest łagodna, przepisuje się antybiotyki, które zwalczają bakterie odpowiedzialne za chorobę. W cięższych przypadkach konieczna może być hospitalizacja, podawanie płynów dożylnie, a także leki przeciwbólowe i przeciwzapalne.",  
//         PrescribedMedications: "Antybiotyki, takie jak amoksycylina lub cefalosporyny. W przypadku silnych bólów proszę podać leki przeciwbólowe, takie jak tramadol.",
//         Recommendations: "W przypadku zapalenia pęcherza moczowego u psa ważne jest, aby zwrócić uwagę na nawyki żywieniowe zwierzęcia. Należy unikać nadmiernego karmienia psa jedzeniem bogatym w fosfor, który jest jednym z czynników, który przyczynia się do rozwoju choroby. Ważne jest również, aby zawsze zapewnić psu czystą wodę pitną. W przypadku podejrzenia choroby należy jak najszybciej skonsultować się z weterynarzem, aby uniknąć poważniejszych powikłań choroby.",
//         Vet: "Marcin Klimczak"
//     },
//   ];
  
  const columns = [
    { field: "diagnosisDate", headerName: "Data diagnozy", type: "date", flex: 1, minWidth: 110, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data diagnozy'}
        </strong>
      )},
      { field: "name", headerName: "Nazwa choroby", type: "string", flex: 1, minWidth: 110, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Nazwa choroby'}
        </strong>
      )},
    { field: "diseaseDescription", headerName: "Opis choroby", type: "string", flex: 3, minWidth: 280, headerAlign: 'center',align: 'center', renderHeader: () => (
        <strong>
          {'Opis choroby'}
        </strong>
      )},
    { field: "treatmentDescription", headerName: "Opis leczenia", type: "string", flex: 4.5,
    minWidth: 340, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Opis leczenia'}
        </strong>
      )},
      { field: "prescribedMedications", headerName: "Przepisane leki", type: "string", flex: 2.5,
    minWidth: 200, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Przepisane leki'}
        </strong>
      )},
      { field: "recommendations", headerName: "Zalecenia", type: "string", flex: 4,
      minWidth: 350, headerAlign: 'center', align: 'center', renderHeader: () => (
          <strong>
            {'Zalecenia'}
          </strong>
        )},
    { field: "vet", headerName: "Weterynarz", type: "string", flex:2, minWidth: 140, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Weterynarz'}
        </strong>
      )},
  ];

function Diseases(){
    let navigate = useNavigate();
    const {petId} = useParams();
    const [rows, setRows] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getData(`api/Pet/${petId}/TreatedDiseases`).then((result) => {
          const data = result.petTreatedDiseases.map(obj => {
            const { id, name, diseaseDescription, treatmentDescription, prescribedMedications, recommendations,
              diagnosisDate, vet } = obj; // Wybierz potrzebne właściwości obiektu z pierwszej tablicy
            return { id, name, diseaseDescription, treatmentDescription, prescribedMedications, recommendations,
              diagnosisDate: new Date(diagnosisDate), vet }; // Utwórz nowy obiekt z wybranymi właściwościami
          })
            setRows(data);
            setLoading(false);
        })
    }, [])

    const handleBack = () => {
        navigate(`/pets/${petId}`)
    }
    return(
        <div style={{paddingTop: "9em", width: "100%"}}>
          {isLoading && <Loader />}
          {!isLoading && <div>
            <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "2%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <DataTable rows={rows} columns={columns} paddingProp="0.5%"/>
            </div>}
        </div>
    )
}

export default Diseases;