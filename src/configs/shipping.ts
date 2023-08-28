import { ShippingTypeEnum } from '@/types';

export const shippingEstimationTimes: Record<ShippingTypeEnum, number> = {
    [ShippingTypeEnum.STANDARD]: 3 * 24 * 60 * 60 * 1000, // 3 days
    [ShippingTypeEnum.EXPRESS]: 1 * 24 * 60 * 60 * 1000, // 1 day
};

export const shippingTypeToLabel: Record<ShippingTypeEnum, string> = {
    [ShippingTypeEnum.STANDARD]: 'Standard (2-3 days)',
    [ShippingTypeEnum.EXPRESS]: 'Express (1 day)',
};
