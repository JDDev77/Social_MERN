import { useEffect, useState } from "react"
import avatar from "../../assets/img/user.png"
import Global from "../../helpers/Global"
//TODO REVISAR CUANDO TENGAMOS SEGUIDORES Y DEMAS
export const People = () => {

    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [more, setMore] = useState(true)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        getUsers(1)
    }, [])


    const getUsers = async (nextPage) => {
        //Efecto de carga
        setLoading(true)
        //Peticion para sacar usuarios
        const request = await fetch(Global.url + 'user/list/'+ nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })

        const data = await request.json()
        console.log(data)
        
        //Crear un estado para poder listarlos
        if (data.users && data.status == "success") {
            let newUsers = data.users

            if(users.length >= 1){
                newUsers = [...users, ...data.users]
            }

            setUsers(newUsers)
            console.log(users)
            setLoading(false)
        }
        // Paginacion
        if(users.length >= data.total){
            setMore(false)
        }
    }

    const nextPage = () => {
        let next = page +1
        setPage(next)
        console.log(page)
        getUsers(next)
        console.log(page,users)
        console.log(page,next)
    }
    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Gente</h1>
            </header>
            <div className="content__posts">

               
                {users.map(user => {
                    return (
                        <article className="posts__post" key={user.id}>
                            <div className="post__container">
                                <div className="post__image-user">
                                    <a href="#" className="post__image-link">
                                        {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="post__user-image" alt="Foto de perfil" />}
                                        {user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}

                                    </a>
                                </div>
                                <div className="post__body">
                                    <div className="post__user-info">
                                        <a href="#" className="user-info__name">{user.name}{user.name}</a>
                                        <span className="user-info__divider"> | </span>
                                        <a href="#" className="user-info__create-date">{user.created_at}</a>
                                    </div>
                                    <h4 className="post__content">{user.bio}</h4>
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
                })}


            </div>
            {loading ? <div>Cargando...</div>: ""}
            {more &&
            <div className="content__container-btn">
                <button className="content__btn-more-post" onClick={nextPage}>
                    Ver más personas
                </button>
            </div>
        }
            <br />
        </>
    )
}
