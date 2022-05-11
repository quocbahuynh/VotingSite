import React from 'react'
import { Button, Figure, Dropdown } from 'react-bootstrap'
import SearchForm from './SearchForm'

export default function Nav({ dataSearch, loginStatus, showLogin, name, setLogin, handleDetail }) {

    const handleLogout = () => {

        localStorage.removeItem('token_votebellclub');
        window.location.reload(false);

    }

    return (
        <div className="header-wrap">
            <header className="header">
                <div className="container-fluid" >

                    <div className="header__content">
                        <div className="header__logo">
                            <Figure.Image
                                width={100}
                                height={100}
                                src="https://www.bellclubueh.net/wp-content/uploads/2020/04/LOGO_BELL_White.svg"
                                className='img-curr'
                            />
                        </div>


                        <SearchForm items={dataSearch} handleDetail={handleDetail} />

                        <div className="header__actions">
                            {
                                loginStatus ?
                                    (<><div className="header__action header__action--profile">
                                        <Dropdown>
                                            <Dropdown.Toggle className="dropdown" onClick={handleLogout}>
                                                Logout <i className="icofont-logout"></i>
                                            </Dropdown.Toggle>
                                        </Dropdown>
                                    </div>
                                    </>
                                    ) : (
                                        <Button variant="dark" onClick={() => showLogin(true)} >Login</Button>
                                    )
                            }


                        </div>

                    </div>
                </div>
            </header>
        </div>

    )
}
