import react, {useState, useEffect} from 'react';
import Axios from 'axios';
import Modal from 'react-modal';


function Dictionary(){
    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles ={ 
        content:{
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            maxHeight: '100vh'
        },
    };

    const openModal = () => {
        setIsOpen(true);  
    }

    const closeModal = () =>{
        setIsOpen(false);
    }


    const DictionaryAPI = async() =>{
        try{
            const data = await Axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            );
            setMeaning(data.data);
        }catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        DictionaryAPI();
    }, [word])

    return(
        <div>
            <button onClick={openModal}>open</button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Dictionary</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" value={word} onChange={(e)=> setWord(e.target.value)} />
                            <label htmlFor="floatingInput">Search a word</label>
                        </div>
                        <div className="definition-container" >
                            {/*<p>/{meaning[0].phonetics[0].text}/</p>
                            {meaning[0] && word && (
                                <audio
                                    src={meaning[0].phonetics[0] && meaning[0].phonetics[0].audio}
                                    style={{backgroundColor:'#fff', borderRadius:'10'}}
                                    controls
                                >
                                    Your browser doesn't support audio element.
                                </audio>
                            )}*/}
                            <br />
                            {word === "" ?(
                                <span className="subtitle">Start by typing a word </span>
                            ):(
                            meaning.map((mean) => 
                            mean.meanings.map((item) => 
                            item.definitions.map((def)=>(
                                <div className="single-meaning" key={def.definition} >
                                    <b>Definition: </b>
                                    <p>{def.definition}</p>
                                    <hr />
                                    {def.example && (
                                        <span>
                                            <b>Example: </b>
                                            <p>{def.example}</p>
                                        </span>
                                    )}
                                  {/*  {def.synonyms && (
                                        <span>
                                            <b>Synonyms: </b>
                                            <p>{def.synonyms.map((synonym)=> `${synonym},`)}</p>
                                        </span>
                                    )}*/}
                                </div>
                            ))
                            ))
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default Dictionary;