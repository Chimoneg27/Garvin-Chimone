import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useState } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function NavList() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-lg lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {["Home", "Blog", "Projects"].map((item) => (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal text-lg"
          key={item}
        >
          <a href="#" className="flex items-center">
            {item}
          </a>
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="flex justify-center items-start mt-6 px-4">
      <Navbar className="sticky top-0 z-10 w-[90%] rounded-none bg-gray-100 px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 text-xl font-bold"
          >
            GC
          </Typography>
          <div className="mr-4 hidden lg:block">{navList}</div>
          <Button variant="gradient" size="sm" className="hidden lg:inline-block text-base">
            <span><SettingsIcon /></span>
          </Button>
          <IconButton
            variant="text"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          {navList}
          <Button fullWidth variant="gradient" size="sm" className="text-base">
            <span><SettingsIcon /></span>
          </Button>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavList