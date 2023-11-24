import { useEffect, useRef, useState } from "react";
import showErrorToast from "./toast/showErrorToast";
import FormStyle from "@styles/Form.module.css"
import PlaylistCard from "./playlist-card";
import PlaylistStyle from "@styles/Playlist.module.css";
import { toast } from "react-toastify";
import showSucessToast from "./toast/showSuccessToast";
export default function MusicForm() {
    const [musics, setMusics] = useState<string[]>([]);
    const [playlists, setPlaylists] = useState<string[]>([])
    const [filter, setFilter] = useState("");
    const textRef = useRef(null);

    const[textArea, setTextArea] = useState("");

    useEffect(() => { console.log(musics) }, [musics]);

    function addMusic() {
        if (filter.length == 0) {
            showErrorToast("Informe uma música para a recomendação");
            return;
        }
        if (musics.lastIndexOf(filter) >= 0) {
            showErrorToast("Esta música já está adicionada na lista");
            return;
        }
        setFilter("");
        setMusics((prevMusics: any) => [...prevMusics, filter])
    }

    const ref = useRef(null);

    function onKeyDown(e: any) {
        if (e.key == "Enter") {
            addMusic();
        }
        else if (e.key == "Escape") {
            searchPlaylist();
        }
    }
    function searchPlaylist() {
        setPlaylists([]);

        const toastId = toast("Carregando recomendações", {
            isLoading: true,
            position: "bottom-left"
        })

        fetch(`${[process.env.API_URL]}/recommendation?tracks=${musics.join(',')}`)
            .then(resp => resp.json())
            .then(resp => {
                resp.forEach((pid: string, index: number) => {
                    setTimeout(() => setPlaylists((prevPlaylist: string[]) => [...prevPlaylist, pid]), index * 300);
                })
                toast.dismiss(toastId);
                showSucessToast("Playlists carregadas");
            })
    }
    function handleDown(e:any){
        const entry = e.target.value.split(",");
        try{
            setMusics(entry);
           setTextArea(e.targer.value);
        }catch{
            setTextArea(e.target.value)
            showErrorToast("Formato deve ser um array de musicas separadas por , ");
        }
    }
    function deleteMusic(index: number) {
        setMusics(musics.filter((_, i) => index != i));
    }
    return (
        <div className={PlaylistStyle["container"]}>
            <div title="As músicas informadas irão basear as recomendações que serão feitas" className={FormStyle["form-filter"]}>
                <div className={FormStyle["input-container"]}>
                    <input type="text" name="music" list="musics" placeholder="Digite o nome da música" ref={ref} onKeyDown={onKeyDown} value={filter} onChange={(e) => setFilter(e.target.value)}></input>
                    <datalist  id="musics">
                        
                    </datalist>
                    <button type="button" className={FormStyle["button"]} onClick={addMusic}>+</button>
                </div>

                <div className={FormStyle["music-model"]}>
                <div className={FormStyle["musics-cascade"]}>
                    {musics.map((music, index) => {
                        return <div key={index} className={FormStyle["music"]}>
                            <p>{music}</p>
                            <button onClick={() => deleteMusic(index)} type="button">X</button>
                        </div>
                    })}
                </div>
        	 <div className={FormStyle["music-container"]}>
                <textarea  title="Cole aqui o array das musicas" ref={ref}  onChange={handleDown} value={textArea}/> 
            </div>
            </div>
                <button onClick={searchPlaylist} className={FormStyle["button"]}>Buscar</button>
            </div>
            <div className={PlaylistStyle["playlist-container"]}>
                {playlists.map((recommendation => <PlaylistCard recommendation={recommendation} />))}
            </div>
        </div>

    )
}