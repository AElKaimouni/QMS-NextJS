import { createSlice } from '@reduxjs/toolkit';
import { FieldType, QueueCreation } from '@/types/queue';

const initialState: QueueCreation = {
    title: '',
    description: '',
    wid: '1',
    config: {
        fields: [{
            name: "email",
            required: true,
            type: FieldType.EMAIL
        }]
    },
};
;

const createQueueSlice = createSlice({
    name: 'createqueue',
    initialState: initialState,
    reducers: {
        updateTitle: (state, action) => {
            state.title = action.payload;
        },
        updateDescription: (state, action) => {
            state.description = action.payload;
        },
        updateWid: (state, action) => {
            state.wid = action.payload;
        },
        updateConfig: (state, action) => {
            state.config = action.payload;
        },
        updateStartTime: (state, action) => {
            if (!state.config.time) {
                state.config.time = {
                    days: [],
                    startTime: '',
                    endTime: '',
                };
            }
            state.config.time.startTime = action.payload;
        },
        updateEndTime: (state, action) => {
            if (!state.config.time) {
                state.config.time = {
                    days: [],
                    startTime: '',
                    endTime: '',
                };
            }
            state.config.time.endTime = action.payload;
        },
        updateDays: (state, action) => {
            if (!state.config.time) {
                state.config.time = {
                    days: [],
                    startTime: '',
                    endTime: '',
                };
            }
            if (state.config.time.days.includes(action.payload)) {
                state.config.time.days = state.config.time.days.filter((day) => day !== action.payload);
                return;
            }
            state.config.time.days.push(action.payload);
        },
        addField: (state, action) => {
            if (!state.config.fields) {
                state.config.fields = [];
            }
            state.config.fields.push(action.payload);
        },
        removeField: (state, action) => {
            if (!state.config.fields) {
                return;
            }
            state.config.fields = state.config.fields.filter((field) => field.name !== action.payload);
        },
        setQueue: (state, action) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.config = action.payload.config;
        },
    },
});

export const { updateTitle, updateDescription, updateDays, updateConfig, addField, removeField, updateEndTime, updateStartTime, setQueue, updateWid,  } = createQueueSlice.actions;

export default createQueueSlice.reducer;
