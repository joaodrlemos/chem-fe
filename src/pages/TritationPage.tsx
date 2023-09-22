import React from 'react';
import {Navbar} from '../components/Navbar';
import {InputForm} from '../components/InputForm';

export const TritationPage: React.FC = () => {
    const handleSubmit = (values: { [key: string]: string }) => {
        const data = {
            concentrationA: values.concentrationA,
            concentrationB: values.concentrationB,
            volumeA: values.volumeA,
            volumeB: values.volumeB
        };

        console.log(data);
    };

    return (
        <div className="container">
            <div className="top-section half-section">
                <Navbar showHomeButton={true} />
                <img src="../assets/images/Logo com fundo preto JPG (1).jpg" alt="Chem Logo" />
                <h1 className="title">Tritation Module</h1>
            </div>
            <div className="bottom-section half-section">
                <InputForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
