# Finance Tracker

Kullanıcıların gelir ve giderlerini kaydedebildiği, taksitli işlemlerini takip edebildiği ve aboneliklerini yönetebildiği bir kişisel finans yönetim uygulaması. Uygulama, verileri görselleştirerek kullanıcıya harcama alışkanlıkları hakkında istatistikler sunar.

## Özellikler
Kullanıcı kayıt, giriş ve çıkış sistemi

Session tabanlı kimlik doğrulama (cookie ile)

Gelir ve gider ekleme, listeleme ve silme

Taksitli harcamaların takibi ve aylık tutar hesaplaması

Abonelik yönetimi (Netflix, Spotify vb.) ve aktiflik durumu

Yaklaşan abonelik ödemelerinin (son 7 gün) otomatik filtrelenmesi

Harcama özetleri (Toplam gelir, gider ve varlık hesaplama)

Dinamik grafikler ile kategori bazlı istatistik analizi

Kullanıcı bilgilerini (kullanıcı adı, email, şifre) güncelleme

##Kullanılan Teknolojiler
Frontend: React, React Router, Axios, Recharts

Backend: Node.js, Express, MongoDB, Mongoose

Authentication: express-session, bcrypt, connect-mongo

## Mimari
Veri İşleme:

MongoDB → Mongoose Modelleri → REST API

##Veri Yapısı:

## Modeller: User, Expense, Subscription

## İlişkiler: User ObjectId üzerinden bağlantılı veriler

## Katmanlar:

Auth Middleware (Erişim kontrolü)

API Routes (Harcama ve abonelik yönetimi)

React Components & Pages (Görselleştirme ve etkileşim)

## Öne Çıkan Kısımlar
Kullanıcı şifreleri bcrypt ile güvenli bir şekilde hashlenir

Oturum yönetimi MongoDB üzerinde saklanan sessionlar ile sağlanır

MongoDB Aggregation ile kategori bazlı toplam harcamalar hesaplanır

Taksitli işlemlerin aylık yükü dinamik olarak tabloya yansıtılır

Abonelik isimlerine göre otomatik marka logoları çekilir

Recharts kullanılarak gelir/gider dağılımı pasta grafikleriyle sunulur

7 günlük periyottaki ödemeler tarih bazlı algoritma ile listelenir

## Kazanımlar
Fullstack web uygulaması geliştirme

Session ve Cookie tabanlı authentication yönetimi

NoSQL veritabanı modelleme ve ilişkisel veri kullanımı

Veri görselleştirme ve Dashboard tasarımı

Backend tarafında CRUD operasyonları ve Middleware mimarisi
