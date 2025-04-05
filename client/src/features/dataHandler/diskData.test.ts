import { describe, it, expect, vi } from 'vitest'
import axios, { AxiosError } from 'axios'
import memoryInfo from './diskData'

vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('memoryInfo', ()=> {
    it ('Должен вернуть данные если запрос успешен', async () => {
        const mockData = {
            diskInfo: [
                {"disk":"/","free":"953.86","total":"1006.85","used":"53.00"}
            ],
        }

        mockedAxios.get.mockResolvedValueOnce({ data: mockData })

        const result = await memoryInfo();

        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8080/server/diskInfo')

        expect(result).toEqual(mockData)
    })
})
