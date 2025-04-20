import { z } from 'zod';

export const createAddressSchema = z.object({
  receiverName: z.string().min(1, '받는 분은 필수입니다.'),
  zoneCode: z.string().min(1, '우편번호는 필수입니다.'),
  address: z.string().min(1, '주소는 필수입니다.'),
  detailAddress: z.string().min(1, '상세주소는 필수입니다.'),
  phoneNumber: z.string().min(1, '연락처는 필수입니다.'),
});

export const updateAddressSchema = z.object({
  addressNickname: z.string().optional(),
  receiverName: z.string().min(1, '받는 분은 필수입니다.'),
  zoneCode: z.string().min(1, '우편번호는 필수입니다.'),
  address: z.string().min(1, '주소는 필수입니다.'),
  detailAddress: z.string().min(1, '상세주소는 필수입니다.'),
  phoneNumber: z
    .string()
    .min(10, { message: '전화번호는 최소 10자리여야 해요.' })
    .max(13, { message: '전화번호는 최대 13자리까지 허용돼요.' })
    .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, {
      message: '유효한 전화번호 형식이 아니에요.',
    }),
});
