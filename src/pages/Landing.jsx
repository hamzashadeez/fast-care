import Header from "../components/Header";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-brand/10 min-h-screen">
      <Header />
      {/* hero */}
      <div className="">
        <section className="relative bg-[url(https://images.unsplash.com/photo-1512677859289-868722942457?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat min-h-screen mb-4">
          <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="bg-gradient-to-r from-brand via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-6xl">
                Medical Consultancy Was
                <span className="sm:block mt-3"> Never Been Easier. </span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                Empowering Rapid Access To Quality Healthcare
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  className="block w-full rounded border border-brand bg-brand px-12 py-3 text-md font-medium text-white hover:bg-transparent hover:text-brand focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                  to="/login"
                >
                  Get Started
                </Link>

                <Link
                  className="block w-full rounded border border-pink-500 px-12 py-3 text-sm font-medium text-pink-500 hover:bg-pink-500 focus:outline-none focus:ring hover:text-white  sm:w-auto"
                  to="#"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* end hero */}
      <main>
        <h1 className="text-3xl lg:text-5xl text-center mt-24 font-semibold text-brand">
          Our Team
        </h1>

        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
              <div className="md:col-span-1">
                <div className="max-w-lg md:max-w-none">
                  <h2 className="text-2xl font-semibold text-gray-900 sm:text-2xl">
                    A team with over 25+ years of experience{" "}
                    <span className="text-brand">COMBINED</span>
                  </h2>

                  <p className="mt-4 text-gray-700 text-lg">
                    We are fortunate to have a highly skilled and motivated team
                    that consistently produces exceptional and reliable
                    solutions for this project
                  </p>
                </div>
              </div>

              <div className="md:col-span-3">
                <img src="/group.jpg" className="rounded" alt="" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="mx-auto max-w-screen-xl sm:mt-36 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-brand  sm:text-5xl">
            Trusted by Experienced Medical Personel
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            dolores laborum labore provident impedit esse recusandae facere
            libero harum sequi.
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Total Users
            </dt>

            <dd className="text-4xl font-extrabold text-brand md:text-5xl">
              10,000+
            </dd>
          </div>

          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Official Addons
            </dt>

            <dd className="text-4xl font-extrabold text-brand md:text-5xl">
              24
            </dd>
          </div>

          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Total Addons
            </dt>

            <dd className="text-4xl font-extrabold text-brand md:text-5xl">
              86
            </dd>
          </div>

          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Downloads
            </dt>

            <dd className="text-4xl font-extrabold text-brand md:text-5xl">
              86k
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Landing;
