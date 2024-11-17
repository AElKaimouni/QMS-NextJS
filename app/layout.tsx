import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Header from '@/components/layouts/header';
import MainContainer from '@/components/layouts/main-container';
import Overlay from '@/components/layouts/overlay';
import Portals from '@/components/portals';
import ContentAnimation from '@/components/layouts/content-animation';
import MobileNav from '@/components/layouts/mobile-nav';

export const metadata: Metadata = {
    title: 'QUICKQ App',
};
const nunito = Nunito({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={nunito.variable}>
                <ProviderComponent>
                    {/* BEGIN MAIN CONTAINER */}
                    <div className="relative">
                        <Overlay />

                        <MainContainer>
                            {/* BEGIN SIDEBAR */}
                            {/* <Sidebar /> */}
                            {/* END SIDEBAR */}

                            <div className="main-content flex min-h-[100dvh] flex-col">
                                {/* BEGIN TOP NAVBAR */}
                                <Header />
                                {/* END TOP NAVBAR */}

                                {/* BEGIN CONTENT AREA */}
                                <ContentAnimation>{children}</ContentAnimation>
                                {/* END CONTENT AREA */}

                                <Portals />

                                <MobileNav />
                            </div>
                        </MainContainer>
                    </div>
                </ProviderComponent>
            </body>
        </html>
    );
}
