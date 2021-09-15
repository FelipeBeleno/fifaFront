import { Fragment, useEffect, useState } from 'react';
import { DetailPlayer } from './components/DetailPlayer';
import { TablePlayers } from './components/TablePlayers';
import { Players } from './interfaces/genericsIntefaces';

function App() {

  const [players, setPlayers] = useState<any>()


  const [play1, setPlay1] = useState<any>('')

  const [busqueda, setBusqueda] = useState('')

  const [errorBusqiueda, setErrorBusqiueda] = useState<string>('')

  const [typeSearchB, setTypeSearchB] = useState('')


  useEffect(() => {

    if (localStorage.getItem('x-header') !== null) {

      handleFunctionCallApi()

    } else {
      localStorage.setItem('x-header', 'key-api-124')

      handleFunctionCallApi();

    }
  }, [])


  const handleFunctionCallApi = async (typeSerach: string = '') => {


    let typeserachUrl = typeSerach === '' ? '/players' : '/team'
    let meth = typeSerach === '' ? 'GET' : 'POST'

    console.log(meth)

    let op = meth == 'GET' ? {
      headers: {
        'x-api-key': localStorage.getItem('x-header') || 'hola'
      }

    } : {
      method: meth,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': localStorage.getItem('x-header') || 'hola'
      },
      body: JSON.stringify({ Name: busqueda, Page: 1 })

    }

    let resp: Response = await fetch(`https://fifa-app-node.herokuapp.com/api/v1${typeserachUrl}`, op);


    let body: any = await resp.json()


    if (body.message) {


      setErrorBusqiueda(body.message)
      return
    }

    setPlayers(body)

    let type = typeSerach == '' ? 'player' : 'team'

    setTypeSearchB(type)


  }


  const handleSubmit = () => {

    if (busqueda.length <= 2) {

      setErrorBusqiueda('Ingrese mas de dos caracteres')

      return;

    }

    handleFunctionCallApi('team')

  }


  return (
    <Fragment>

      <div className="container pt-5  mb-5 ">


        <div className="card shadow">
          <div className="card-body">
            <h3 className="card-title mt-5">FIFA 21 Ultimate Team</h3>
            <div className="row mt-5">
              <div className="col-md-6 col-xs-12 mt-5">
                <h5 className="card-subtitle mb-2 text-muted"><b>Lista de Juagadores</b></h5>

                {
                  players !== undefined
                  &&
                  <TablePlayers players={players} setPlayers={setPlayers} setPlay1={setPlay1} typeSearchB={typeSearchB} busqueda={busqueda} />

                }

              </div>

              <div className="col-md-6 col-xs-12 mt-5">
                <h5 className="card-subtitle mb-2 text-muted"><b>Detalle de jugador </b></h5>


                {
                  play1 !== ''
                    ?
                    <DetailPlayer det={play1} />
                    : <h3 className="mt-5">Selecciona un juagador de la lista</h3>
                }


              </div>



              <div className="col-12 mt-5">
                <div className="container d-flex">
                  <input className="form-control" value={busqueda} onChange={(e) => {
                    if (e.target.value.length > 2) {
                      setErrorBusqiueda('')
                    }
                    setBusqueda(e.target.value)
                  }} />
                  <button className="btnProp btn" onClick={handleSubmit} > Buscar </button>

                </div>
                {
                  errorBusqiueda != ''
                  &&
                  <div className="alert alert-danger mt-4 p-1" role="alert">
                    {errorBusqiueda}
                  </div>
                }

              </div>
            </div>

          </div>
        </div>
      </div>

    </Fragment>

  );
}

export default App;
