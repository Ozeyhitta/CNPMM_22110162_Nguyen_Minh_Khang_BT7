import React from "react";
import "./modal.css";
type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: ModalSize;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    showCloseButton?: boolean;
}
interface ModalSectionProps {
    children: React.ReactNode;
    className?: string;
}
export declare const Modal: React.FC<ModalProps> & {
    Header: React.FC<ModalSectionProps>;
    Body: React.FC<ModalSectionProps>;
    Footer: React.FC<ModalSectionProps>;
};
export {};
