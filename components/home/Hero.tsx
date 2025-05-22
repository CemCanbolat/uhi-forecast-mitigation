import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaFileAlt } from 'react-icons/fa';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.heroSection}>
            <Image
                src="/images/hero.png"
                alt="Satellite view of a city"
                fill
                priority
                className={styles.heroImage}
            />
            <div className={styles.heatWaveContainer}>

                <div className={styles.centralHeatIsland}></div>

                <div className={styles.largeHeatIsland1}></div>
                <div className={styles.largeHeatIsland2}></div>
                <div className={styles.mediumHeatIsland}></div>
                <div className={styles.smallerHeatSpot}></div>
                <div className={styles.peripheralHeatSpot}></div>
            </div>

            <div className="container mx-auto px-6 py-16 relative z-10 text-center">
                <h1 className={styles.heroTitle}>
                    Predicting Urban Heat: AI for Cooler, Livable Cities
                </h1>

                <p className={styles.heroDescription}>
                    An open-source app that leverages artificial intelligence to predict and help mitigate Urban Heat Islands (UHIs) in cities.
                </p>

                <div className={styles.buttonContainer}>
                    <Link href="/app" className={styles.primaryButton}>
                        <FaSearch className="text-xl" /> Start Exploring
                    </Link>
                    <Link href="/docs" className={styles.secondaryButton}>
                        <FaFileAlt className="text-xl" /> Documentation
                    </Link>
                </div>
            </div>
        </section>
    );
};
export default Hero;