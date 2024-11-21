import ContentAnimation from '@/components/layouts/content-animation';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import MainContainer from '@/components/layouts/main-container';
import MobileNav from '@/components/layouts/mobile-nav';
import Overlay from '@/components/layouts/overlay';
import Portals from '@/components/portals';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
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

                    <Footer />
                </div>
            </MainContainer>
        </div>
    );
}
