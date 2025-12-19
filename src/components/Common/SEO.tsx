/* 
    기본 SEO 설정 컴포넌트
*/
import { Helmet } from "react-helmet-async";

const DEFAULT_SEO = {
  title: "폴리(POLI)", // 기본 사이트 이름
  description:
    "사이버 사기, 폴리와 함께 빠르고 든든하게 대처하세요. AI 상담부터 경찰서 제출용 진정서 자동 작성까지, 복잡한 신고 과정을 한 번에 도와드립니다.",
  image: "https://poli.ai.kr/poli-og-image.png", // ⚠️ 실제 썸네일 이미지 경로로 꼭 수정해주세요! (public 폴더 안의 경로 등)
  url: "https://poli.ai.kr",
};

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noindex?: boolean; // 검색 엔진이 수집하지 못하게 할지 여부
};

const SEO = ({ title, description, image, url, noindex=false }: SEOProps) => {
  // props로 넘어온 값이 있으면 그걸 쓰고, 없으면 위의 기본값(DEFAULT_SEO)을 씁니다.
  const seoTitle = title || DEFAULT_SEO.title;
  const seoDescription = description || DEFAULT_SEO.description;
  const seoImage = image || DEFAULT_SEO.image;
  const seoUrl = url || DEFAULT_SEO.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization", // 혹은 "WebSite"
    "name": "폴리(POLI) - 사이버 사기 상담 및 진정서 작성 도우미",
    "url": seoUrl,
    "logo": "https://poli.ai.kr/poli-og-image.png", // 구글 검색결과에 뜰 로고/이미지
    "image": seoImage,
    "description": seoDescription,
    "sameAs": [
      "https://poli.ai.kr" // 관련 소셜 미디어가 있다면 여기에 추가
    ]
  };

  return (
    <Helmet titleTemplate={`%s | ${DEFAULT_SEO.title}`}>
      {/* 1. 기본 메타 태그 */}
      <title>{seoTitle}</title>
      {/* 2. noindex가 true이면 검색 엔진이 수집하지 못하게 함 */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta name="description" content={seoDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* 2. 오픈 그래프 (카카오톡, 페이스북, 슬랙 공유 시) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content="폴리(Poli)" />

      {/* 3. 트위터 (선택 사항) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
