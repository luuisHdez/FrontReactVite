import React, { useEffect, useState } from 'react';

const Headerh = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`w-full fixed top-0 z-30 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="flex justify-between items-center py-2 px-4">
                <div className="logo">
                    <img src="https://static.wixstatic.com/media/0890b4_cdd63def72544243bd00b6e1f5d57923~mv2.png" alt="Logo" className="h-10" />
                </div>
                <nav className="hidden md:flex gap-6">
                    <a href="#" className="text-black text-lg">Start</a>
                    <a href="#" className="text-black text-lg">About</a>
                    <a href="#" className="text-black text-lg">Procedures</a>
                    <a href="#" className="text-black text-lg">Price</a>
                </nav>
                <div className="flex items-center gap-4">
                    <div className="social-media flex gap-3">
                        <a href="https://www.instagram.com/dr.raultrujillo" target="_blank" rel="noopener noreferrer">
                            <img src="https://static.wixstatic.com/media/11062b_ca1d837ce7194421b781ee7384061a8e~mv2.png" alt="Instagram" className="h-6" />
                        </a>
                        <a href="https://www.facebook.com/drraultrujillo" target="_blank" rel="noopener noreferrer">
                            <img src="https://static.wixstatic.com/media/11062b_362ef89dec51403eb0ee59a21bde967c~mv2.png" alt="Facebook" className="h-6" />
                        </a>
                        <a href="https://www.tiktok.com/@dr.raul.cirugiaplastica" target="_blank" rel="noopener noreferrer">
                            <img src="https://static.wixstatic.com/media/11062b_7fc95bac711041dcb9691b6a09192a84~mv2.png" alt="TikTok" className="h-6" />
                        </a>
                    </div>
                    <a href="#" className="border border-black py-1 px-3 text-black ml-4 bg-white rounded">Schedule</a>
                    <div className="language-selector flex items-center gap-2 ml-2">
                        <img src="https://static.parastorage.com/services/linguist-flags/1.663.0/assets/flags/round/MEX.png" alt="Spanish" className="h-6" />
                        <img src="https://static.parastorage.com/services/linguist-flags/1.663.0/assets/flags/round/USA.png" alt="English" className="h-6" />
                    </div>
                </div>
            </div>
            <section className="w-full h-screen flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                    <video
                        src="https://video.wixstatic.com/video/c837a6_fcfb3321d91941ac99a1cd2b75b34f6e/1080p/mp4/file.mp4"
                        playsInline
                        preload="auto"
                        muted
                        loop
                        autoPlay
                        className="w-full h-full object-cover"
                    ></video>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 z-10">
                    <div className="image-container mb-4 md:mb-0">
                        <img
                            src="https://static.wixstatic.com/media/0890b4_cdd63def72544243bd00b6e1f5d57923~mv2.png"
                            alt="Mujer pelo largo"
                            className="opacity-70 max-w-full"
                        />
                    </div>
                    <div className="text-container text-white md:ml-8">
                        <h1 className="text-4xl md:text-5xl font-bold">CIRUJANO PLÁSTICO</h1>
                        <h2 className="text-3xl md:text-4xl font-normal">DR. RA​ÚL TRUJILLO</h2>
                        <a href="https://calendly.com/drtrujillo" target="_blank" rel="noopener noreferrer" className="mt-4 py-2 px-6 border border-white text-white inline-block rounded bg-black bg-opacity-50">
                            AGENDA TU CITA
                        </a>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Headerh;
