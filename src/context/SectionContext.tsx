import React, { createContext, useContext, useState, useCallback } from "react";

export type SectionId = "about" | "projects" | "experience";

interface SectionState {
    about: boolean;
    projects: boolean;
    experience: boolean;
}

interface SectionContextType {
    expandedSections: SectionState;
    expandSection: (sectionId: SectionId) => void;
    toggleSection: (sectionId: SectionId) => void;
    isExpanded: (sectionId: SectionId) => boolean;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

const initialState: SectionState = {
    about: true, // About is expanded by default
    projects: false,
    experience: false,
};

export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [expandedSections, setExpandedSections] =
        useState<SectionState>(initialState);

    const expandSection = useCallback((sectionId: SectionId) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: true,
        }));
    }, []);

    const toggleSection = useCallback((sectionId: SectionId) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    }, []);

    const isExpanded = useCallback(
        (sectionId: SectionId) => {
            return expandedSections[sectionId];
        },
        [expandedSections]
    );

    return (
        <SectionContext.Provider
            value={{ expandedSections, expandSection, toggleSection, isExpanded }}
        >
            {children}
        </SectionContext.Provider>
    );
};

export const useSectionContext = (): SectionContextType => {
    const context = useContext(SectionContext);
    if (context === undefined) {
        throw new Error(
            "useSectionContext must be used within a SectionProvider"
        );
    }
    return context;
};
