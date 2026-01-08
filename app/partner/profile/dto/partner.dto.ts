import { KycStatus, User } from "@/lib/api/types";
import { HotelDTO } from "../../hotels/dto/hotel.dto";

export interface UpsertPartnerDto {
  company?: string;
}

export interface Partner {
  id: string;
  userId: string;
  company: string | null;
  kycStatus: KycStatus;
  createdAt: string;
  updatedAt: string;
  user?: User;
  hotels?: HotelDTO[];
  kycDocuments?: KycDocument[];
}

export interface CreateKycDocDto {
  kind: string;
  url: string;
}

export interface KycDocument {
  id: string;
  partnerId: string;
  kind: string;
  url: string;
  createdAt: string;
}
