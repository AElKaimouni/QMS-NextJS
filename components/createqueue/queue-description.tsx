'use client';

import { getTranslation } from '@/i18n';
import { useAppDispatch, useTypedSelector } from '@/store';
import { updateDescription, updateTitle, updateWid } from '@/store/createQueueSlice';
import { useGetAllWorkspacesQuery } from '@/store/services/workspaces';
import { type Options } from 'easymde';
import 'easymde/dist/easymde.min.css';
import React, { useCallback, useMemo } from 'react';
import Select from 'react-select';
import SimpleMdeReact from 'react-simplemde-editor';

const { t } = getTranslation();

const QueueDescription = () => {
    const { data: workspaces = [], isLoading: loadingWorkspaces, error: errorWorkspaces } = useGetAllWorkspacesQuery(undefined);
    
    const formData = useTypedSelector((state) => state.createQueue);

    const { title, description, wid } = useTypedSelector((state) => state.createQueue);
    const dispatch = useAppDispatch();

    const handleTitleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(updateTitle(e.target.value));
        },
        [dispatch]
    );

    const handleDescriptionChange = useCallback(
        (value: string) => {
            dispatch(updateDescription(value));
        },
        [dispatch]
    );

    const handleWidChange = useCallback(
        (option: any) => {
            dispatch(updateWid(option.value));
        },
        [dispatch]
    );

    const mdOptions = useMemo(() => {
        return {
            placeholder: t('Enter a description'),
            spellChecker: false,
            hideIcons: ['guide', 'fullscreen', 'side-by-side', 'preview', 'image', 'table', 'horizontal-rule'],
            maxHeight: "100px"
        } as Options;
    }, []);

    const selectOptionsWorkspaces = useMemo(() => {
        return workspaces.map((workspace) => ({
            label: workspace.title,
            value: workspace.id,
        }));
    }, [workspaces]);

    return (
        <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">{t('Enter your business details')}</p>
            <input type="text" className="form-input" placeholder={t('Business name')} required value={title} onChange={handleTitleChange} />

            <SimpleMdeReact value={description} onChange={handleDescriptionChange} options={mdOptions} />
            
            {/* @ts-ignore */}
            {/* <Select options={selectOptionsWorkspaces} value={workspaces.find((workspace) => String(workspace.id) === wid)} onChange={handleWidChange} isSearchable={false} /> */}
        </div>
    );
};

export default QueueDescription;
