// 📌 증거자료 타입
export type Evidence = {
  fileName: string; // 증거 파일 이름 (예: "송금내역.png")
  fileUrl: string;  // 증거 파일 경로 또는 URL
};

// 📌 진정인(본인) 정보
type Complainant = {
  name: string;     // 진정인 이름
  address: string;  // 진정인 주소
  contact: string;  // 진정인 연락처 (전화번호 등)
};

// 📌 피진정인(가해자) 정보
type Respondent = {
  name: string;           // 피진정인 이름
  contact: string;        // 피진정인 연락처
  specialNotes?: string;  // 특이사항 (예: 전과, 별명, 추가 정보) - 선택 항목
};

// 📌 메인 진정 데이터 타입
export type ComplaintData = {
  complainant: Complainant;           // 진정인 정보
  respondent: Respondent;             // 피진정인 정보
  crimeType: string;                  // 범죄유형 (예: 사이버 범죄, 폭행 등)
  crimeDetail: string;                // 세부 범죄유형 (예: 인터넷 사기, 명예훼손 등)
  siteName: string;                   // 피해 발생 사이트 이름
  siteUrl: string;                     // 피해 발생 사이트 주소 (URL)
  crimeName: string;                   // 진정죄명 (예: 사기죄, 협박죄)
  intentToPunish: string;             // 처벌의사 (true: 처벌 원함, false: 원치 않음)
  incidentDescription: string;         // 피해사실 (간단 요약)
  incidentDetails: string;             // 피해상황 (상세 설명)
  evidences: Evidence[];               // 증거자료 목록
  complaintDate: string;               // 진정 접수일 (YYYY-MM-DD)
};

class Complaint implements ComplaintData {
  complainant!: Complainant;
  respondent!: Respondent;
  crimeType!: string;
  crimeDetail!: string;
  siteName!: string;
  siteUrl!: string;
  crimeName!: string;
  intentToPunish!: string;
  incidentDescription!: string;
  incidentDetails!: string;
  evidences!: Evidence[];
  complaintDate!: string;

  constructor(data: ComplaintData) {
    Object.assign(this, data);
  }

  update(data: Partial<ComplaintData>) {
    Object.assign(this, data);
  }
}

export default Complaint;
