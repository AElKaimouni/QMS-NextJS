type LoaderProps = {
    size?: 'small' | 'large';
};

export default function Loader({ size }: LoaderProps) {
    const loaderSize = size === 'small' ? 'h-6 w-6' : 'h-12 w-12';
    return <span className={`m-auto inline-block ${loaderSize} animate-spin rounded-full border-2 border-success border-l-transparent align-middle`}></span>;
}
