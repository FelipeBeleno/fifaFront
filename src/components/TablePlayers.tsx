import {  Player } from '../interfaces/genericsIntefaces';

export const TablePlayers: React.FC<any> = ({ players, setPlayers, setPlay1, typeSearchB, busqueda }) => {


    const handlePaginator = async (e: string) => {


        let pageNext = e === 'left' ? Number(players.Page) - 1 : Number(players.Page) + 1;



        pageNext = pageNext === 0 ? 1 : pageNext


        pageNext = pageNext >= players.totalPages ? players.totalPages : pageNext

        let extUrl = busqueda === '' || busqueda === undefined ? `/players?page=${pageNext}` : '/team'



        let op = busqueda === undefined || busqueda === '' ? {
            headers: {
                'x-api-key': localStorage.getItem('x-header') || 'hola'
            }

        } : {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': localStorage.getItem('x-header') || 'hola'
            },
            body: JSON.stringify({ Name: busqueda, Page: pageNext })

        }


        let resp: Response = await fetch(`https://fifa-app-node.herokuapp.com/api/v1${extUrl}`, op)

        let body: any = await resp.json()
        setPlayers(body)

    }

    const handleClickPlayer = (p: Player) => {
        setPlay1(p)
    }



    return (
        <div>

            <div className="table-responsive">

                <table className="table tableEdit shadow table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col"> Avatar </th>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">{typeSearchB}</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            players.players.map((p, i) => {

                                let sum = players.Page === 1 ? i + 1 : players.Page * 10 + 1 + i - 10;
                                return <tr
                                    key={players.Page * 10 + i + 1}
                                    onClick={() => handleClickPlayer(p)}
                                    className="trPT"
                                >

                                    <th scope="row">{sum}</th>
                                    <td><img
                                        src="https://fifa-app-node.herokuapp.com/avatar.png"
                                        alt="IMGAVATAR"
                                        className="avartar"
                                    /></td>
                                    <td>{p.name}</td>
                                    <td>{p.position}</td>
                                    <td>{p.team || p.nation}</td>
                                </tr>



                            })
                        }

                    </tbody>


                </table>

                <svg
                    className="btnLeftRigth"
                    onClick={() => handlePaginator('left')}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
                </svg>

                <svg className="btnLeftRigth"
                    onClick={() => handlePaginator('right')}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                </svg>
            </div>
        </div>
    )
}
