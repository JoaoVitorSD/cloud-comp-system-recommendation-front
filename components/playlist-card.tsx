import PlaylistStyle from "@styles/Playlist.module.css"

export default function PlaylistCard({recommendation}: any){
    return(
        <div className={PlaylistStyle["playlist-card"]} title={`because you liked: ${recommendation.matchedTracks.join(", ")}`}>
            {recommendation.playlist}

            <nav>
                <ul>
                    {recommendation.rule.map((music: string, index: number) => {
                        return <li key={index}>{music}</li>
                    })}
                </ul>
            </nav>
        </div>
    )
}