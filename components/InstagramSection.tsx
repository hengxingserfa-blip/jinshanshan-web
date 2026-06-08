import Ornament from "@/components/Ornament";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE_URL,
  type IGPost,
} from "@/lib/instagram";

interface Props {
  posts: IGPost[];
}

export default function InstagramSection({ posts }: Props) {

  return (
    <section className="bg-ivory-50 py-16 md:py-36">
      <div className="mx-auto max-w-7xl px-3 sm:px-10">
        <div className="text-center mb-8 md:mb-20 px-3 sm:px-0">
          <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-4 md:mb-6 uppercase">
            Daily on Instagram
          </p>
          <h2 className="font-display text-3xl md:text-6xl text-ink-950 mb-4 md:mb-6 leading-tight">
            每天<span className="italic font-serif text-gold-500"> 新到櫃 </span>都在 IG
          </h2>
          <Ornament className="mb-6 md:mb-8" />
          <p className="text-ink-700 max-w-2xl mx-auto text-sm md:text-lg leading-loose font-light">
            試戴影片 · 進貨直播 · 限量款搶先看
            <br />
            <span className="text-ink-500 text-xs md:text-base">
              追蹤 @{INSTAGRAM_HANDLE} 第一手看到新品
            </span>
          </p>
        </div>

        {posts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 mb-10 md:mb-16">
            {posts.map((post, i) => (
              <div
                key={post.shortcode}
                className="bg-ink-950/5 border border-ink-950/8 overflow-hidden"
              >
                {/* 手機 480px, 桌機 640px — 把影片內容顯示出來,不只 thumbnail */}
                <iframe
                  src={post.embedUrl}
                  className="w-full block h-[480px] sm:h-[640px]"
                  style={{ border: 0 }}
                  loading={i < 2 ? "eager" : "lazy"}
                  scrolling="no"
                  allowTransparency
                  title={post.caption || `Instagram ${post.isVideo ? "Reel" : "Post"} ${i + 1}`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#F77737] text-white hover:opacity-90 transition-opacity text-sm tracking-[0.35em] font-display uppercase"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.332.014 7.052.072 5.775.13 4.602.402 3.635 1.369c-.967.967-1.239 2.14-1.297 3.417C2.28 6.066 2.266 6.475 2.266 12c0 5.525.014 5.934.072 7.214.058 1.277.33 2.45 1.297 3.417.967.967 2.14 1.239 3.417 1.297C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.45-.33 3.417-1.297.967-.967 1.239-2.14 1.297-3.417.058-1.28.072-1.689.072-7.214 0-5.525-.014-5.934-.072-7.214-.058-1.277-.33-2.45-1.297-3.417C19.398.402 18.225.13 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
            <span>追蹤 @{INSTAGRAM_HANDLE}</span>
            <span>→</span>
          </a>
          {posts.length === 0 && (
            <p className="text-[10px] tracking-[0.25em] text-ink-400 font-display max-w-md text-center mt-2 leading-loose">
              ※ 點上方按鈕到 Instagram 看每日更新的新品影片
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
