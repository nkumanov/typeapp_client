import React, { FormEventHandler } from 'react'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: '25px',
    height: 'fit-content',

};


const Create: React.FC = () => {
    

    let [title, setTitle] = useState<string>('');
    let [subTitle, setSubTitle] = useState<string>('');
    let [category, setCategory] = useState<string>('');
    let [description, setDescription] = useState<string>('');
    let [image, setImage] = useState<string | undefined>('')



    let navigate = useHistory();
    const cookie = new Cookies();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect((): void | undefined => {
        if (cookie.get('userData') == undefined) {
            navigate.push('/login');
            return undefined;
        }
    }, [])





    let fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.split('\\').pop();

        setImage(value);
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();


        const blog = {
            title: title,
            subTitle: subTitle,
            category: category,
            image: image,
            description: description,
        }

        try {
            const result = await fetch('http://localhost:5000/blogs', {
                method: 'POST',
                headers: { "Content-Type": "application/json", 'X-Authorization': cookie.get('userData') },
                body: JSON.stringify(blog)
            })
            console.log(result)
            navigate.push('/')
            setOpen(false)
            
        } catch (error) {
            console.log(error);
        }

    }


    return (

        <div>
            <Button onClick={handleOpen} style={{ color: 'black' }}>Create Blog</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <h2>Create new blog post</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-element">
                            <p>Title: </p>
                            <label htmlFor="title"><input type="text" id="title" name="title" onChange={(event) => setTitle(event.target.value)} placeholder="Title" /></label>

                        </div>
                        <div className="form-element">
                            <p>Sub-Title: </p>
                            <label htmlFor="subTitle"><input type="text" id="subTitle" name="subTitle" onChange={(event) => setSubTitle(event.target.value)} placeholder="Sub-Title" /></label>

                        </div>
                        <div className="form-element">
                            <p>Category: </p>
                            <label htmlFor="category"><select onChange={(event) => setCategory(event.target.value)} name="category" id="category">
                                <option value="science">Science</option>
                                <option value="programming">Programming</option>
                                <option value="life-Style">Life Style</option>
                                <option value="cars">Cars</option>
                                <option value="productivity">Productivity</option>
                                <option value="relationships">Relationships</option>
                                <option value="politics">Politics</option>
                            </select></label>

                        </div>
                        <div className="form-element">
                            <p>Description: </p>
                            <label htmlFor="description"><textarea onChange={(event) => setDescription(event.target.value)} name="description" id="description" cols={100} rows={4}
                                placeholder="Put your description here"></textarea></label>

                        </div>
                        <div className="form-element">
                            <p>Image: </p>
                            <label htmlFor="image">
                                Select image
                                <input onChange={fileSelectedHandler} type="file" id="image" name="image" placeholder="image" />

                            </label>

                        </div>
                        <div className="form-element">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default Create