import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    switch (target.innerText) {
      case "Home":
        router.push("/");
        break;
      case "TV Shows":
        router.push("/tv");
        break;
      case "Movies":
        router.push("/movie");
        break;
      case "New & Popular":
        router.push("/new&popular");
        break;
      case "My List":
        router.push("/my-list");
        break;
    }
    setAnchorEl(null);
  };

  return (
    <div className="md:!hidden">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="!capitalize !text-white"
      >
        Browse
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu"
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link href="/">
          <MenuItem
            onClick={handleClose}
            selected={router.pathname == "/" && true}
          >
            Home
          </MenuItem>
        </Link>

        <Link href="/tv">
          <MenuItem
            onClick={handleClose}
            selected={router.pathname == "/tv" && true}
          >
            TV Shows
          </MenuItem>
        </Link>

        <Link href="/movie">
          <MenuItem
            onClick={handleClose}
            selected={router.pathname == "/movie" && true}
          >
            Movies
          </MenuItem>
        </Link>

        <Link href="/new&popular">
          <MenuItem
            onClick={handleClose}
            selected={router.pathname == "/new&popular" && true}
          >
            New & Popular
          </MenuItem>
        </Link>
        <Link href="/my-list">
          <MenuItem
            onClick={handleClose}
            selected={router.pathname == "/my-list" && true}
          >
            My List
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
