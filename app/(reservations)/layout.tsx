import ContentAnimation from '@/components/layouts/content-animation';
import MainContainer from '@/components/layouts/main-container';
import Overlay from '@/components/layouts/overlay';
import NoneAuthHeader from '@/components/layouts/none-auth-header';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* BEGIN MAIN CONTAINER */}
            <div className="relative">
                <Overlay />

                <MainContainer>
                    <div className="main-content flex min-h-[100dvh] flex-col">
                        {/* BEGIN TOP NAVBAR */}
                        <NoneAuthHeader />
                        {/* END TOP NAVBAR */}

                        {/* BEGIN CONTENT AREA */}
                        <ContentAnimation>{children}</ContentAnimation>
                        {/* END CONTENT AREA */}
                    </div>
                </MainContainer>
            </div>
        </>
    );
}
