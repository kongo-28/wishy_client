import * as React from "react";
import { Container } from "@mui/material";
import styles from "@/styles/Home.module.css";
import Paper from "@mui/material/Paper";

const Footer = () => {
  return (
    <Container maxWidth="xl">
      <div className={styles.footer}>©2024 k.ryota</div>
    </Container>
  );
};

export default Footer;
