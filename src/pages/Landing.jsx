import Header from "../components/Header";

const Landing = () => {
    return (
        <div className="bg-brand/10 min-h-screen">
            <Header />
            <main>

            </main>

           <div className="">
            <h1 className="text-3xl lg:text-5xl text-center font-semibold text-brand">Our Team</h1>
           <section className="flex flex-col md:flex-row md:gap-12 gap-4">
                <img src="/group.jpg" alt="" />
                </section>
           </div>

        </div>
    )
}


export default Landing;