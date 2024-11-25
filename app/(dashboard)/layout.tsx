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


                <div className="main-content flex min-h-[100dvh] flex-col">
                    <Header />

                    <ContentAnimation>{children}</ContentAnimation>

                    <Portals />

                    <MobileNav />

                    <Footer />
                </div>
            </MainContainer>
        </div>
    );
}
