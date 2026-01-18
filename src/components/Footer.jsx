import mainImage from '../images/gfx/logo1 (1).svg'
import Google from '../images/gfx/GooglePlay.svg'
import Store from '../images/gfx/store.svg'
export default function Footer() {
  return (
    <footer className="bg-pink-200 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">About Us</h2>
            <div className="border-t-2 border-pink-400 w-16 mb-4"></div>
            <p className="max-w-md text-sm">
              Butterfly with shades of pink that are full of different energy stands for women&apos;s power.
              They can do, and they are able to.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="bg-white flex items-center mb-4 justify-center rounded-full w-fit p-2"
              style={{
                boxShadow:
                  "0px 4px 6px rgba(0, 0, 0, 0.1), 0px -4px 6px rgba(0, 0, 0, 0.1), 4px 0px 6px rgba(0, 0, 0, 0.1), -4px 0px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={mainImage}
                alt="NAA World Logo"
                width={100}
                height={100}
                className=""
              />
            </div>
            <div className="flex space-x-4">
              <img
                src={Google}
                alt="Get it on Google Play"
                width={135}
                height={40}
              />
              <img
                src={Store}
                alt="Download on the App Store"
                width={135}
                height={40}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>Copyright © 2024 NAA World All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}