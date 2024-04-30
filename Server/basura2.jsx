import Global from "../../helpers/Global"
//TODO REVISAR CUANDO TENGAMOS SEGUIDORES Y DEMAS
export const People = () => {
    const getUsers = async() => {
        const request = await fetch(Global.url + 'user/list/1',{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Gente</h1>
            </header>
            <div className="content__posts">
                <article className="posts__post">
                    <div className="post__container">
                        <div className="post__image-user">
                            <a href="#" className="post__image-link">
                            </a>
                        </div>
                        <div className="post__body">
                            <div className="post__user-info">
                                <a href="#" className="user-info__name"></a>
                                <span className="user-info__divider"> | </span>
                                <a href="#" className="user-info__create-date"></a>
                            </div>
                            <h4 className="post__content"></h4>
                        </div>
                    </div>

                    <div className="post__buttons">
                        <a href="#" className="post__button post__button--green">
                            Seguir
                        </a>
                        {/* TODO BOTON ELIMINAR
                                <a href="#" className="post__button post__button">
                                    Dejar se seguir
                                </a>
                                */}
                    </div>
                    <br />
                </article>
                )
            </div>
            
            
                <div className="content__container-btn">
                    <button className="content__btn-more-post">
                        Ver más personas
                    </button>
                </div>
    
           <br />
        </>
    )
}
