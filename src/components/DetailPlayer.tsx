
export const DetailPlayer: React.FC<any> = ({ det }) => {


    return (
        <div className="mt-5">
            <img
                src="https://fifa-app-node.herokuapp.com/avatar.png"
                alt="img avatar"
                className="avartar1"
            />
            <h4 className="mt-4"><b>{det.name}</b></h4>
            <h4 className="mt-4">{det.position}</h4>
            <h4 className="mt-4">{det.team || det.nation}</h4>

        </div>
    )
}
