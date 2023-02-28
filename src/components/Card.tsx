

interface CardParticles {
    title: string;
    description: string;
    imgUri: string;
}


export default function Card(props: CardParticles) {


    return(
        <div className="card">
            <div className="card-title">{props.title}</div>
            <div className="card-description">{props.description}</div>
            <div className="card-img"><img src={props.imgUri} alt={props.title}  style={{ width: "100%", height: "100%", objectFit: "cover" }}/></div>
        </div>
    )
}