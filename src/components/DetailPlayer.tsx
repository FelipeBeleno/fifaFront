
export const DetailPlayer: React.FC<any> = ({ det }) => {


    return (
        <div className="mt-5">
            <img
                src="https://lh3.googleusercontent.com/proxy/7j0OMq3fXH1c86RzwOqe_EM2IO0FInQOC_6ttnHrfWp92oV0NJ9NjfDHfWnV2OTxZ__c67n3KtBjqdLRz59WBImX-r45Qb1uIBWH3m62bjhbGQsWSICCxjio4HXwFlip5EvyWMEOH8j1fVwgs8yOV6LtLbYbuFk_8WVKAkXWbw"
                alt="img avatar"
                className="avartar1"
            />
            <h4 className="mt-4">{det.name}</h4>
            <h4 className="mt-4">{det.position}</h4>
            <h4 className="mt-4">{det.team}</h4>

        </div>
    )
}
