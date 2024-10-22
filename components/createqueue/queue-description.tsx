'use client';

import React, { useCallback, useMemo } from 'react';
import { getTranslation } from '@/i18n';
import SimpleMdeReact from 'react-simplemde-editor';
import { useTypedSelector, useAppDispatch } from '@/store';
import { updateTitle, updateDescription } from '@/store/createQueueSlice';
import { type Options } from 'easymde';
import 'easymde/dist/easymde.min.css';

const QueueDescription = () => {
    const { t } = getTranslation();
    const { title, description } = useTypedSelector((state) => state.createQueue);
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

    const mdOptions = useMemo(() => {
        return {
            placeholder: t('Enter a description'),
            spellChecker: false,
            hideIcons: ['guide', 'fullscreen', 'side-by-side', 'preview', 'image', 'table', 'horizontal-rule'],
        } as Options;
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">{t('Enter your business details')}</p>
            <input type="text" className="form-input" placeholder={t('Business name')} required value={title} onChange={handleTitleChange} />

            <SimpleMdeReact value={description} onChange={handleDescriptionChange} options={mdOptions} />
        </div>
    );
};

export default QueueDescription;
