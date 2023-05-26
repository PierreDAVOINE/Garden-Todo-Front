export interface HomeProps {
    setIsLoginModalOpen: (value: boolean) => void;
    setIsSignup: (value: boolean) => void;
    isLogged: boolean;
}

export interface HandleUsProps {
    isLogged: boolean;
    setIsLoginModalOpen: (value: boolean) => void;
}