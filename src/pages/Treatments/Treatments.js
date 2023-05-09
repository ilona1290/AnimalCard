import React from "react";
import DataTable from "../../components/DataTable";
import { useParams, useNavigate } from 'react-router-dom'

const rows = [
    {
        id: 1, 
        TreatmentDate: new Date("2023-05-02"),
        Diagnosis: "Zwierzę ma przyklejonego kleszcza do skóry, który może powodować zakażenie lub stan zapalny. Konieczne jest usunięcie kleszcza, aby zapobiec poważnym komplikacjom zdrowotnym.", 
        Description: "Wyciąganie kleszcza to zabieg, który polega na usunięciu kleszcza z powierzchni skóry zwierzęcia. Kleszcze są częstym problemem zdrowotnym u zwierząt i powinny być usuwane jak najszybciej, aby zapobiec zakażeniu lub stanom zapalnym.Kroki zabiegu: Przygotowano niezbędne narzędzia, w tym rękawiczki, pęsetę, antyseptyk i woreczek na odpadki. Założono rękawiczki i odkażono pęsetę antyseptykiem. Chwycono kleszcza za główkę pęsetą, jak najbliżej skóry. Wykonano delikatny ruch w kierunku przeciwnym do ruchu wskazówek zegara, aby odłączyć kleszcza od skóry. Nie należy kręcić lub wykręcać kleszcza, ponieważ może to powodować uszkodzenie kleszcza lub jego wydzielinę. Włożono kleszcza do woreczka na odpadki. Oczyszczono skórę antyseptykiem, aby zapobiec zakażeniu. Po zabiegu, należy obserwować miejsce, gdzie znajdował się kleszcz, aby upewnić się, że nie pojawiły się żadne objawy zakażenia lub stanu zapalnego.",  
        Vet: "Marcin Klimczak"
    },
    {
        id: 2, 
        TreatmentDate: new Date("2018-09-05"),
        Diagnosis: "Zwierzę nie jest w stanie jeść lub pić ze względu na chorobę lub uraz. Wskazane jest zastosowanie karmienia sondą, aby zapewnić mu odpowiednie odżywienie i nawodnienie.", 
        Description: "Karmienie sondą to zabieg, który polega na wprowadzeniu sondy do żołądka lub jelita, aby umożliwić zwierzęciu otrzymanie niezbędnych składników odżywczych i wody, gdy nie jest ono w stanie jeść lub pić samodzielnie. Jest to ważny zabieg, który pomaga utrzymać zdrowie zwierzęcia i zapobiec jego osłabieniu.Kroki zabiegu: \nPrzygotowano niezbędne narzędzia, w tym sondę, jednorazowe rękawiczki, wazelinkę, strzykawkę, wodę do płukania i pokarm.\nOceniono, czy zwierzę jest w stanie przyjąć sondę przez usta, czy wymagana jest wprowadzenie jej przez nos.\nWprowadzono sondę przez usta, załóżono jednorazowe rękawiczki i nałożo wazelinkę na sondę, aby ułatwić jej przesuwanie się przez usta i gardło.\nWprowadzono sondę do gardła i pchnięto ją delikatnie w kierunku żołądka, jednocześnie kontrolując, czy zwierzę oddycha prawidłowo.\nGdy sonda osiągnieła żołądek lub jelito, przepłukano ją wodą do płukania, aby zapewnić swobodny przepływ pokarmu. \nWstrzyknięto pokarm do sondy za pomocą strzykawki, kontrolując tempo i ilość wstrzykiwanego pokarmu, aby uniknąć refluksu. \nPo karmieniu, wypłukano sondę wodą do płukania, aby usunąć resztki jedzenia i zapobiec zatkanie sondy. \nUstalono harmonogram karmienia sondą i kontrolowania stanu zdrowia zwierzęcia.",  
        ControlDate: new Date("2018-11-05"),
        Vet: "Marcin Klimczak"
    },
    {
        id: 3, 
        TreatmentDate: new Date("2015-03-25"),
        Diagnosis: "Rana głęboka, wymagająca zszywania. Wskazane jest jak najszybsze zaopatrzenie rany, aby uniknąć zakażenia i przyspieszyć proces gojenia.", 
        Description: "Przygotowano niezbędne narzędzia, w tym nożyczki, igły, nici chirurgiczne, płyn dezynfekujący i inne narzędzia. Umieszczono zwierzę w pozycji, która umożliwia łatwe dostanie się do rany. Oceniono ranę pod kątem ewentualnych uszkodzeń, takich jak złamania, uszkodzenia mięśni lub naczyń krwionośnych. Oczyszczono ranę z zanieczyszczeń i krwi, używając płynu dezynfekującego lub zaleceń weterynarza. Zaszyto ranę, używając igły i nici chirurgicznej. Po zszyciu, nałożono opatrunek na ranę w celu ochrony i uniknięcia zakażenia. Upewniono się, że opatrunek jest odpowiednio dopasowany do rany i zabezpieczony. Przepisano leki przeciwbólowe i antybiotyki, aby pomóc w przyspieszeniu procesu gojenia i zapobiec zakażeniu.",  
        ControlDate: new Date("2015-04-12"),
        Vet: "Marcin Klimczak"
    },
  ];
  
  const columns = [
    { field: "TreatmentDate", headerName: "Data zabiegu", type: "date", flex: 1, minWidth: 100, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data zabiegu'}
        </strong>
      )},
    { field: "Diagnosis", headerName: "Diagnoza", type: "string", flex: 3, minWidth: 200, headerAlign: 'center',align: 'center', renderHeader: () => (
        <strong>
          {'Diagnoza'}
        </strong>
      )},
    { field: "Description", headerName: "Opis", type: "string", flex: 5,
    minWidth: 400, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Opis'}
        </strong>
      )},
    { field: "ControlDate", headerName: "Data kontroli", type: "date", flex: 1, minWidth: 100, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data kontroli'}
        </strong>
      )},
    { field: "Vet", headerName: "Weterynarz", type: "string", flex:2, minWidth: 140, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Weterynarz'}
        </strong>
      )},
  ];

function Treatments(){
    let navigate = useNavigate();
    const {petId} = useParams();

    const handleBack = () => {
        navigate(`/pets/${petId}`)
    }
    return(
        <div style={{paddingTop: "9em", width: "100%"}}>
            <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "6.5%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <DataTable rows={rows} columns={columns} paddingProp="7%"/>
        </div>
    )
}

export default Treatments;